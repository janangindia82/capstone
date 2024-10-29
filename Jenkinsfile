pipeline {
    agent any
    environment {
        KUBECONFIG = "C:\\Users\\janap\\.kube\\config"
        DOCKER_IMAGE = "node-app"
        MYSQL_YAML = "mysql-deployment.yml"
        APP_YAML = "app-deployment.yml"
        MINIKUBE_DOCKER_HOST = 'tcp://$(minikube ip):2376'
        MINIKUBE_CERT_PATH = '$(minikube docker-env --shell=bash | grep CERT_PATH)'
        MINIKUBE_TLS_VERIFY = '$(minikube docker-env --shell=bash | grep DOCKER_TLS_VERIFY)'
    }
    stages {
        stage('Setup Minikube Docker Environment') {
            steps {
                script {
                    // Manually setting Docker environment variables
                    sh "export DOCKER_HOST=${MINIKUBE_DOCKER_HOST}"
                    sh "export DOCKER_CERT_PATH=${MINIKUBE_CERT_PATH}"
                    sh "export DOCKER_TLS_VERIFY=${MINIKUBE_TLS_VERIFY}"
                }
            }
        }
        stage('Login to Docker') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                    }
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }
        stage('Deploy MySQL on Minikube') {
            steps {
                script {
                    sh "kubectl apply -f ${MYSQL_YAML}"
                }
            }
        }
        stage('Deploy Node.js App on Minikube') {
            steps {
                script {
                    sh "kubectl apply -f ${APP_YAML}"
                }
            }
        }
    }
    post {
        always {
            script {
                sh "kubectl get pods"
                sh "kubectl get services"
            }
        }
    }
}
