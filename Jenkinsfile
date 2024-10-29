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
                    // Obtain Docker environment variables for Minikube
                    def dockerEnv = sh(script: 'minikube docker-env --shell bash', returnStdout: true)
                    def envVars = dockerEnv.split('\n')
                    envVars.each { var ->
                        if (var.startsWith('export')) {
                            def keyValue = var.replace('export ', '').split('=')
                            env[keyValue[0].trim()] = keyValue[1].trim().replace('"', '')
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image for the Node.js app
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
                    // Apply the Node.js app deployment configuration
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
