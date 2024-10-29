pipeline {
    agent any
    environment {
        KUBECONFIG = "C:\\Users\\janap\\.kube\\config"
        DOCKER_IMAGE = "node-app"
        MYSQL_YAML = "mysql-deployment.yml"
        APP_YAML = "app-deployment.yml"
    }
    stages {
        stage('Setup Minikube Docker Environment') {
            steps {
                script {
                    sh './setup-docker-env.sh'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE}:latest .'
                }
            }
        }
        stage('Deploy MySQL on Minikube') {
            steps {
                script {
                    sh 'kubectl apply -f ${MYSQL_YAML}'
                }
            }
        }
        stage('Deploy Node.js App on Minikube') {
            steps {
                script {
                    // Use the local Docker image for the deployment
                    sh 'kubectl set image deployment/node-app node-app=${DOCKER_IMAGE}:latest'
                    sh 'kubectl apply -f ${APP_YAML}'
                }
            }
        }
    }
    post {
        always {
            script {
                sh 'kubectl get pods'
                sh 'kubectl get services'
            }
        }
    }
}
