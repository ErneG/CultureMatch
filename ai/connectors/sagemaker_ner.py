import os
import json
import boto3


class SageMakerNer:
    def __init__(self) -> None:
        self.newline = "\n"
        self.bold = "\033[1m"
        self.unbold = "\033[0m"
        self.ner_endpoint = os.environ["SGM_NER_ENDPOINT"]

    def ner_analysis_single(self, input_text: str) -> str:
        def query_endpoint(encoded_text):
            client = boto3.client("runtime.sagemaker")
            response = client.invoke_endpoint(
                EndpointName=self.ner_endpoint,
                ContentType="application/x-text",
                Body=encoded_text,
            )
            return response

        def parse_response(query_response):
            model_predictions = json.loads(query_response["Body"].read())
            predictions = model_predictions["predictions"]
            return predictions

        try:
            query_response = query_endpoint(input_text.encode("utf-8"))
        except Exception as e:
            if e.response["Error"]["Code"] == "ModelError":
                raise Exception(
                    "Backend scripts have been updated in Feb '22 to standardize response "
                    "format of endpoint response."
                    "Previous endpoints may not support verbose response type used in this notebook."
                    f"To use this notebook, please launch the endpoint again. Error: {e}."
                )
            else:
                raise

        try:
            model_predictions = parse_response(query_response)
        except (TypeError, KeyError) as e:
            raise Exception(
                "Backend scripts have been updated in Feb '22 to standardize response "
                "format of endpoint response."
                "Response from previous endpoints not consistent with this notebook."
                f"To use this notebook, please launch the endpoint again. Error: {e}."
            )

        # print(
        #     f"Inference:{self.newline}"
        #     f"input text: {input_text}{self.newline}"
        #     f"model prediction: {self.bold}{model_predictions}{self.unbold}{self.newline}"
        # )

        return model_predictions
