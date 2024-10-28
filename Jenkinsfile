pipeline {
    agent any 
    environment {
    DOCKERHUB_CREDENTIALS = credentials('jenkins_login')
    }
    stages { 
        stage('SCM Checkout') {
            steps{
            git 'https://github.com/janangindia82/devops.git'
            }
        }

        stage('Build docker image') {
            steps {  
                sh 'docker build -t janangindia82/nodeapp:$BUILD_NUMBER -f Dockerfile .'
            }
        }
        stage('login to dockerhub') {
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('push image') {
            steps{
                sh 'docker push janangindia82/nodeapp:$BUILD_NUMBER'
            }
        }
        stage('Deploy Node.js') {
            steps {
                sh 'kubectl apply -f nodejs-deployment.yaml'
                sh 'kubectl apply -f nodejs-service.yaml'
            }
        }
        stage('Deploy MYSQL') {
            steps {
                sh 'kubectl apply -f mysql-deployment.yaml'
                sh 'kubectl apply -f mysql-service.yaml'
            }
        }
}
post {
        always {
            sh 'docker logout'
        }
    }
}