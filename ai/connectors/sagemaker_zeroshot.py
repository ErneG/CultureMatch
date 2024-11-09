import os
import json
from typing import Any, Dict, List
import boto3
import numpy as np


class SageMakerZeroShot:
    def __init__(self):
        self.newline = "\n"
        self.bold = "\033[1m"
        self.unbold = "\033[0m"
        self.zeroshot_endpoint = os.environ["SGM_ZEROSHOT_ENDPOINT"]

    def zero_shot_single(
        self,
        input_text: str,
        candidate_labels: List[str],
        multi_class: bool = False,
    ) -> Dict[Any, Any]:
        # Query SageMaker endpoint running zero-shot-text-classification-160059
        def query_endpoint(input_json):
            client = boto3.client("runtime.sagemaker")
            response = client.invoke_endpoint(
                EndpointName=self.zeroshot_endpoint,
                ContentType="application/json",
                Body=input_json,
            )
            return response

        # Parse response from zero-shot-text-classification-160059
        def parse_response(query_response):
            model_predictions = json.loads(query_response["Body"].read())
            scores = model_predictions["scores"]
            labels = model_predictions["labels"]
            predicted_label_index = np.argmax(scores)
            predicted_label = labels[predicted_label_index]
            return labels, scores, predicted_label

        # Prepare input query for model
        input_query = json.dumps(
            {
                "sequences": input_text,
                "candidate_labels": candidate_labels,
                "multi_class": multi_class,
            }
        )

        try:
            query_response = query_endpoint(input_query)
            labels, scores, predicted_label = parse_response(query_response)
        except Exception as e:
            print(e)

        # print(
        #     f"Inference:{self.newline}"
        #     f"Sequence: {self.bold}{input_text}{self.unbold}{self.newline}"
        #     f"Labels: {self.bold}{labels}{self.unbold}{self.newline}"
        #     f"Scores: {self.bold}{scores}{self.unbold}{self.newline}"
        #     f"Predicted Label: {self.bold}{predicted_label}{self.unbold}{self.newline}"
        # )

        # Convert labels and scores into a dictionary
        label_scores_dict = {label: score for label, score in zip(labels, scores)}
        return label_scores_dict
