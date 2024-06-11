pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'https://github.com/Reisende8/Happy-Paws-Backend.git'
        GIT_BRANCH = 'main'
        GIT_CREDENTIALS_ID = 'github'
        DOCKER_CREDENTIALS_ID = 'dockerhub'
        KUBECONFIG_CREDENTIALS_ID = 'kube'
        SERVICE_NAME = 'happy-paws-backend-service'
        SERVICE_PORT = '30008'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: "${GIT_BRANCH}", credentialsId: "${GIT_CREDENTIALS_ID}", url: "${GIT_REPO_URL}"
            }
        }

        stage('Verify Workspace') {
            steps {
                sh 'pwd'
                sh 'ls -R $(pwd)'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh """
                   export NVM_DIR="\$HOME/.nvm"
                   [ -s "\$NVM_DIR/nvm.sh" ] && \\. "\$NVM_DIR/nvm.sh"
                   npm install
                """
            }
        }

        stage('Run Tests') {
            steps {
                sh """
                   export NVM_DIR="\$HOME/.nvm"
                   [ -s "\$NVM_DIR/nvm.sh" ] && \\. "\$NVM_DIR/nvm.sh"
                   npx jest
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("reisende8/happy-paws-backend:${env.BUILD_ID}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        docker.image("reisende8/happy-paws-backend:${env.BUILD_ID}").push('latest')
                    }
                }
            }
        }

        stage('Start Minikube') {
            steps {
                sh 'minikube start --driver=docker'
            }
        }

        stage('Debug Kubernetes Connectivity') {
            steps {
                script {
                    withCredentials([file(credentialsId: "${KUBECONFIG_CREDENTIALS_ID}", variable: 'KUBECONFIG')]) {
                        sh 'cat $KUBECONFIG'
                        sh 'curl -k https://192.168.49.2:8443/version'
                    }
                }
            }
        }

        stage('Verify Deployment Files') {
            steps {
                sh 'ls -l ansible/k8s'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withCredentials([file(credentialsId: "${KUBECONFIG_CREDENTIALS_ID}", variable: 'KUBECONFIG')]) {
                        sh 'kubectl apply -f ansible/k8s/backend-deployment.yaml'
                        sh 'kubectl apply -f ansible/k8s/backend-service.yaml'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
