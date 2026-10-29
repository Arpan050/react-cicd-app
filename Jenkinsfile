pipeline {
    agent any
    environment {
        IMAGE = "arpan050/react-cicd-app"
    }
    stages {
        stage('Install Dependencies') {
            steps { sh 'npm ci' }
        }
        stage('Unit Tests') {
            steps { sh 'npm test' }
        }
        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                    sh '''
                      docker run --rm --network host \
                        -e SONAR_HOST_URL=http://localhost:9000 \
                        -e SONAR_TOKEN=$SONAR_TOKEN \
                        -v "$PWD:/usr/src" \
                        sonarsource/sonar-scanner-cli \
                        -Dsonar.projectKey=react-cicd-app \
                        -Dsonar.sources=src \
                        -Dsonar.working.directory=/tmp/.scannerwork \
                        -Dsonar.qualitygate.wait=true
                    '''
                }
            }
        }
        stage('Trivy Filesystem Scan') {
            steps { sh 'trivy fs --skip-version-check --scanners vuln --severity HIGH,CRITICAL --exit-code 0 .' }
        }
        stage('Docker Build') {
            steps { sh 'docker build -t $IMAGE:$BUILD_NUMBER -t $IMAGE:latest .' }
        }
        stage('Trivy Image Scan') {
            steps { sh 'trivy image --skip-version-check --severity HIGH,CRITICAL --exit-code 0 $IMAGE:$BUILD_NUMBER' }
        }
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
                    sh '''
                      echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
                      docker push $IMAGE:$BUILD_NUMBER
                      docker push $IMAGE:latest
                    '''
                }
            }
        }
    }
}
