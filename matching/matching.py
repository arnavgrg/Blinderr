import numpy as np
import string
import time
import json
import re

from bert_serving.client import BertClient
from sklearn.metrics.pairwise import cosine_similarity

import nltk
from nltk.tokenize import sent_tokenize


class Matching(object):
    def __init__(self, payload):
        self.user_ids = payload['user_ids']
        self.descriptions = payload['desc']
        print("Attempting to connect to Bert instance.")
        self.bc = BertClient(ip="34.94.241.99", check_length=False)
        print("Connected to Bert instance.")
        print("Server status:", self.bc.status)

    def clean_paragraphs(self):
        for idx, desc in enumerate(self.descriptions):
            lower_cased_tokens = [word.lower() for word in desc]
            lower_cased_sentence = " ".join(
                [word for word in lower_cased_tokens])
            if lower_cased_sentence:
                self.descriptions[idx] = lower_cased_sentence.strip()

    def get_embeddings(self):
        user_embeddings = self.bc.encode(self.descriptions)
        length = len(self.user_ids)
        self.similarity_matrix = np.zeros([length])
        for i in range(length):
            self.similarity_matrix[i] = cosine_similarity([user_embeddings[0]],
                                                          [user_embeddings[i]])
        print(self.similarity_matrix)

    def get_ranked_matches(self):
        reversed_sorted = np.argsort(self.similarity_matrix)[::-1]
        print(reversed_sorted)
        print(self.user_ids)
        ranked_ids = []
        for index in reversed_sorted:
            if not index:
                continue
            ranked_ids.append(self.user_ids[index])
        return ranked_ids

    def get_matches(self):
        ''' Returns a list of the most important sentences in the legal document. '''
        print("Cleaning text input")
        self.clean_paragraphs()
        print("Generating embeddings and building similarity matrix")
        self.get_embeddings()
        ranked_ids = self.get_ranked_matches()
        ranked = {
            "ranked_ids": ranked_ids
        }
        return ranked
