pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'https://github.com/Reisende8/Happy-Paws-Backend.git'
        GIT_BRANCH = 'main' // Specify the branch you want to build
        GIT_CREDENTIALS_ID = 'github' // Use the credentials ID 'github'
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
    }

    post {
        always {
            cleanWs()
        }
    }
}
