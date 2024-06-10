pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'https://github.com/Reisende8/Happy-Paws-Backend.git'
        GIT_BRANCH = 'main' // Specify the branch you want to build
        GIT_CREDENTIALS_ID = 'github' // Use the credentials ID 'github'
        DOCKER_CREDENTIALS_ID = 'dockerhub' // DockerHub credentials ID
        DOCKER_IMAGE = 'reisende8/happy-paws-backend'
        DEPLOY_IMAGE = 'reisende8/happy-paws-backend-deploy'
        KUBECONFIG_CREDENTIALS_ID = 'kube'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: "${GIT_BRANCH}", credentialsId: "${GIT_CREDENTIALS_ID}", url: "${GIT_REPO_URL}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                   export NVM_DIR="$HOME/.nvm"
                   [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                   npm install --verbose --registry=https://registry.npmjs.org/ --fetch-timeout=60000 --retry=5
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh '''
                   export NVM_DIR="$HOME/.nvm"
                   [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                   npx jest
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Tag Docker Image for Deployment') {
            steps {
                script {
                    sh "docker tag ${DOCKER_IMAGE}:latest ${DEPLOY_IMAGE
