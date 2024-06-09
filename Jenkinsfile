pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "my-backend-app"
        DOCKER_REGISTRY = "my-docker-registry"
        KUBE_CONFIG = credentials('kubeconfig')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Reisende8/Happy-Paws-Backend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-credentials') {
                        docker.image("${DOCKER_IMAGE}:${env.BUILD_ID}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    ansiblePlaybook playbook: 'deploy-backend.yml', inventory: 'inventory.ini', extras: '-e image_tag=${env.BUILD_ID}'
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
