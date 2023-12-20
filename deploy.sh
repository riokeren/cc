GOOGLE_PROJECT_ID=capstone-project-wildnest
CLOUD_RUN_SERVICE=wildnest-service
INSTANCE_CONNECTION_NAME=capstone-project-wildnest:asia-southeast2:wildnest
DB_USER=root
DB_PASS=
DB_NAME=wildnest_db

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
    --project=$GOOGLE_PROJECT_ID

gcloud run deploy $CLOUD_RUN_SERVICE \
    --image acr.io/$GOOGLE PROJECT ID/$CLOUD RUN SERVICE \
    --add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
    --update-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_PASS=$DB_PASS,DB_USER=$DB_USER,DB_NAME=$DB_NAME \
    --platform managed \
    --region asia-southeast2 \
    --allow-unauthenticated \
    --project=$GOOGLE_PROJECT_ID