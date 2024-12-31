pipeline {
    agent any

    environment {
        NODE_HOME = 'C:\\Program Files\\nodejs'
        PATH = "${NODE_HOME};${env.PATH}"
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-creds') // ID des credentials configurés dans Jenkins
        DOCKER_IMAGE_NAME = 'kaoutar2khat/my-angular-project'
        DOCKER_IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Cloner le code source depuis le dépôt Git
                git url: 'https://github.com/kaoutar456/projet_jenkins.git', branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Installer les dépendances via npm
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Exécuter les tests avec ChromeHeadless
                bat 'npm test -- --watch=false --browsers=ChromeHeadless'
            }
        }

        stage('Build Application') {
            steps {
                // Construire l'application en mode production
                bat 'npm run build --prod'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image Docker
                    bat "docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Se connecter à Docker Hub
                    bat "docker login -u ${DOCKER_HUB_CREDENTIALS_USR} -p ${DOCKER_HUB_CREDENTIALS_PSW}"
                    
                    // Pousser l'image Docker
                    bat "docker push ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                }
            }
        }
    }

    post {
        always {
             echo "Post section exécutée : nettoyage de l'espace de travail."
        }
    }
}
