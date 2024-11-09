from dotenv import load_dotenv

from ai.connectors.sagemaker_embedding import SageMakerEmbeddings
from ai.connectors.sagemaker_sentiment import SageMakerSentiment

load_dotenv()

# Sentiment Analysis tests
sentiment_analysis = SageMakerSentiment()

sentiment_res1 = sentiment_analysis.sentiment_analysis_single(
    "I really enjoy the team activities and the work environment."
)
print(sentiment_res1[0])
print(sentiment_res1[1])
print()

sentiment_res2 = sentiment_analysis.sentiment_analysis_single(
    "I feel like my work has a deep impact, but it's stressful."
)
print(sentiment_res2[0])
print(sentiment_res2[1])
print()

# Embeddings tests
input_texts = [
    "I really enjoy the team activities and the work environment.",
    "I feel like my work has a deep impact, but it's stressful.",
]
embeddings = SageMakerEmbeddings()
embeddings_res = embeddings.embeddings_batch(input_texts)
for i, embedding_res in enumerate(embeddings_res):
    print(f"Original text: {input_texts[i]}")
    print(f"Embed: {embedding_res}")
