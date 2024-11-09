from dotenv import load_dotenv

from ai.connectors.sagemaker_access import SageMakerClient

load_dotenv()

client = SageMakerClient()

sentiment_res1 = client.sentiment_analysis_single("I really enjoy the team activities and the work environment.")
print(sentiment_res1[0])
print(sentiment_res1[1])
print()

sentiment_res2 = client.sentiment_analysis_single("I feel like my work has a deep impact, but it's stressful.")
print(sentiment_res2[0])
print(sentiment_res2[1])
print()