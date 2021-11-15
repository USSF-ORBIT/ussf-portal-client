IMAGE=${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}
TASK_FAMILY="portal-client-prototype"

TASK_DEFINITION=$(aws ecs describe-task-definition --task-definition portal-client-prototype --query '{
                containerDefinitions: taskDefinition.containerDefinitions,
                family: taskDefinition.family,
                taskRoleArn: taskDefinition.taskRoleArn,
                executionRoleArn: taskDefinition.executionRoleArn,
                networkMode: taskDefinition.networkMode,
                volumes: taskDefinition.volumes,
                placementConstraints: taskDefinition.placementConstraints,
                requiresCompatibilities: taskDefinition.requiresCompatibilities,
                cpu: taskDefinition.cpu,
                memory: taskDefinition.memory
            }'> tmp-td.json)

NEW_TASK_DEFINTION=$(jq -r --arg NEWIMAGE "$IMAGE" '.containerDefinitions[].image |= $NEWIMAGE' tmp-td.json > tmp-ntd.json)
NEW_TASK_INFO=$(aws ecs register-task-definition --cli-input-json file://tmp-ntd.json)
NEW_REVISION=$(echo $NEW_TASK_INFO | jq '.taskDefinition.revision')
aws ecs update-service --cluster app-portal-client-prototype \
                        --service portal-client \
                        --task-definition ${TASK_FAMILY}:${NEW_REVISION} \
                        --force-new-deployment