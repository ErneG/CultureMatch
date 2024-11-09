import json
from typing import List
import numpy as np
from ai.setup import nlp

from nltk import word_tokenize, pos_tag, FreqDist
from nltk.corpus import stopwords
import math

from ai.connectors.sagemaker_ner import SageMakerNer


class ComplexityScorer:
    def __init__(self):
        self.sgm_ner_instance = SageMakerNer()

        print("Complexity scorer initialized")

    # Lexical Richness: Type-Token Ratio
    def type_token_ratio(self, text):
        tokens = word_tokenize(text.lower())
        types = set(tokens)
        return len(types) / len(tokens) if len(tokens) > 0 else 0

    # Lexical Density: Content words vs function words
    def lexical_density(self, text):
        stop_words = set(stopwords.words("english"))
        tokens = word_tokenize(text)
        content_words = [word for word in tokens if word not in stop_words]
        return len(content_words) / len(tokens) if len(tokens) > 0 else 0

    # Semantic Depth: Using NER to check for complex terms or entities
    def semantic_depth(self, text):
        ner_results = self.sgm_ner_instance.ner_analysis_single(text)
        return len(ner_results)  # Count of named entities

    # Syntactic Complexity: Average sentence length and parse tree depth
    def syntactic_complexity(self, text):
        doc = nlp(text)
        sentence_lengths = [len(sentence) for sentence in doc.sents]
        avg_sentence_length = (
            sum(sentence_lengths) / len(sentence_lengths) if sentence_lengths else 0
        )

        # Measure syntactic depth by counting the maximum depth of syntactic trees
        max_depth = max(
            [len(list(token.subtree)) for token in doc]
        )  # Maximum depth of dependency tree
        return avg_sentence_length, max_depth

    # Combine all factors into a sophistication score
    def sophistication_score(self, text):
        # Lexical richness
        ttr = self.type_token_ratio(text)
        lexical_d = self.lexical_density(text)

        # Semantic depth
        sem_depth = self.semantic_depth(text)

        # Syntactic complexity
        avg_sentence_length, syntactic_depth = self.syntactic_complexity(text)

        # Calculate final score (normalized for simplicity)
        score = (
            ttr * 0.25
            + lexical_d * 0.25
            + sem_depth * 0.25
            + (avg_sentence_length + syntactic_depth) * 0.25
        )
        score = max(0, min(100, score))  # Keep it within range [0, 100]

        return score

    def complexity_score_batch(
        self,
        input_texts: List[str],
    ) -> List[float]:
        """
        Calculate complexity scores for a batch of input texts.

        Args:
            input_texts (List[str]): A list of input texts for which complexity scores need to be calculated.

        Returns:
            List[float]: A list of float values, where each value represents the calculated complexity score
            for the corresponding input text in the batch.

        Example:
            scores = self.complexity_score_batch(["This is a simple sentence.", "This sentence is slightly more complex."])
            print(scores)

        Notes:
            The method used to calculate the complexity score should be specified in the implementation details.
            The function assumes that the complexity score is a measure based on linguistic features.
        """

        # Calculate complexity scores for each input text
        complexity_scores = [
            self.sophistication_score(feedback) for feedback in input_texts
        ]

        # # Example of integrating text complexity into analysis
        # for score, feedback in zip(complexity_scores, input_texts):
        #     print(f"Feedback: {feedback}")
        #     print(f"Complexity Score: {score:.2f}\n")

        # Normalize complexity scores
        normal_complexity = (complexity_scores - np.min(complexity_scores)) / (
            np.max(complexity_scores) - np.min(complexity_scores) + 1e-5
        )
        return normal_complexity
