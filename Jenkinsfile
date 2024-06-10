pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'https://github.com/Reisende8/Happy-Paws-Backend.git'
        GIT_BRANCH = 'main'
        GIT_CREDENTIALS_ID = 'github'
        DOCKER_CREDENTIALS_ID = 'dockerhub'
        KUBECONFIG_CREDENTIALS_ID = 'kube'
        KUBECONFIG = credentials('kube')
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
                   npm install
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
                    dockerImage = docker.build("reisende8/happy-paws-backend:latest")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CREDENTIALS_ID}", variable: 'KUBECONFIG')]) {
                    ansiblePlaybook(
                        playbook: 'ansible/deploy.yml',
                        inventory: 'ansible/inventory'
                    )
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
