# Semana 5 — Kubernetes: Orquestração de Containers

Objetivo: aprender a gerenciar containers em escala usando Kubernetes, focando em deployments, services e scaling.

O que fazer
- Conceitos (curto):
  - Pods: unidades básicas de deployment, contêm um ou mais containers.
  - Deployments: gerenciam réplicas de pods.
  - Services: expõem pods internamente ou externamente.
  - ConfigMaps/Secrets: gerenciar configuração e dados sensíveis.
  - Scaling: aumentar/diminuir número de réplicas automaticamente.
- Hands-on:
  - Instalar Minikube ou usar Kubernetes local (Docker Desktop).
  - Criar manifests YAML para deployment e service do backend.
  - Aplicar: `kubectl apply -f deployment.yaml`
  - Expor serviço: `kubectl port-forward svc/backend-service 3000:3000`
  - Scaling: `kubectl scale deployment backend-deployment --replicas=3`
  - Exercício prático: adicionar ConfigMap para variáveis de ambiente.

Exemplo — Deployment YAML
```yaml
# filepath: k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: backend-app:latest
        ports:
        - containerPort: 3000
```

- Service para expor o deployment.

Dicas de comando
- Aplicar manifest: `kubectl apply -f <file>`
- Listar pods: `kubectl get pods`
- Logs: `kubectl logs <pod-name>`
- Scaling: `kubectl scale deployment <name> --replicas=<num>`
- Port forward: `kubectl port-forward svc/<service> <local-port>:<service-port>`

Critérios de aceitação
- Você cria e aplica um deployment Kubernetes para o backend.
- Configura um service e acessa a aplicação via port-forward.
- Demonstra scaling horizontal aumentando réplicas.

## Ingress para exposição externa
- Usar Ingress controller para rotear tráfego externo.
- Exemplo: configurar domínio para frontend e backend.