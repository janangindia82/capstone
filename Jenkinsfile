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
                  // Set Minikube Docker environment using PowerShell
                    powershell '''
                    $env:DOCKER_ENV = & minikube docker-env --shell powershell
                    Invoke-Expression $env:DOCKER_ENV
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                   // Build the Docker image
                    powershell '''
                    Invoke-Expression & minikube docker-env
                    docker build -t ${DOCKER_IMAGE}:latest .
                    '''
                }
            }
        }

        stage('Deploy MySQL on Minikube') {
            steps {
                script {
                     // Apply MySQL deployment configuration
                    powershell '''
                    kubectl apply -f ${MYSQL_YAML}
                    '''
                }
            }
        }

        stage('Deploy Node.js App on Minikube') {
            steps {
                script {
                    // Apply Node.js deployment configuration
                    powershell '''
                    kubectl apply -f ${APP_YAML}
                    '''
            }
        }
    }

    post {
        always {
            script {
               // Output deployment status
                powershell '''
                kubectl get pods
                kubectl get services
                '''
            }
        }
    }
}
