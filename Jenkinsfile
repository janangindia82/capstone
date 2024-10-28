pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "node-app"
        MYSQL_YAML = "mysql-deployment.yml"
        APP_YAML = "app-deployment.yml"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        stage('Deploy MySQL on Minikube') {
            steps {
                script {
                    // Apply MySQL deployment configuration
                    sh "kubectl apply -f ${MYSQL_YAML}"
                }
            }
        }

        stage('Deploy Node.js App on Minikube') {
            steps {
                script {
                    // Load Docker image to Minikube and apply deployment config
                    sh "eval $(minikube docker-env) && docker build -t ${DOCKER_IMAGE}:latest ."
                    sh "kubectl apply -f ${APP_YAML}"
                }
            }
        }
    }

    post {
        always {
            script {
                // Output deployment status
                sh "kubectl get pods"
                sh "kubectl get services"
            }
        }
    }
}
