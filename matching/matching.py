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
        self.bc = BertClient(check_length=False)  # ip="52.249.61.86"
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
        new_user_embedding = self.bc.encode([self.descriptions[0]])
        other_users_embeddings = self.bc.encode(self.descriptions[1:])
        length = len(self.user_ids)
        self.similarity_matrix = np.zeros([length])
        for i in range(length):
            self.similarity_matrix[i] = cosine_similarity([new_user_embedding[0]],
                                                          [other_users_embeddings[i]])

    def get_ranked_matches(self):
        reversed_sorted = np.argsort(self.similarity_matrix)[::-1]
        ranked_ids = []
        for index in reversed_sorted:
            ranked_ids.append(self.user_ids[index])
        return ranked_ids

    def get_matches(self):
        ''' Returns a list of the most important sentences in the legal document. '''
        print("Cleaning text input")
        self.clean_paragraphs()
        print("Generating embeddings and building similarity matrix")
        ranked_ids = self.get_ranked_matches()
        return ranked_ids


if __name__ == '__main__':
    # Data Format: 1st is new user, 2nd is remaining/filtered users
    data = {
        "user_ids": [1, 2, 3, 4, 5],
        "desc": ["abc", "bcd", "xyz", "dcf", "123"]
    }
    a = Matching(data)
    print(a.get_matches())
