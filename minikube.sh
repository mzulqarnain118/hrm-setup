#!/bin/bash
eval $(minikube docker-env)
docker build -t iq-frontend .
export BRANCH=develop
kubectl apply -f ./deployment.yaml
kubectl rollout restart -n iq-${BRANCH} deployment/iq-frontend
