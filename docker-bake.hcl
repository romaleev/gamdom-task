group "default" {
  targets = ["frontend", "backend"]
}

target "frontend" {
  context = "."
  dockerfile = "./client/Dockerfile.client"
  tags = ["gamdom-task-frontend:latest"]
}

target "backend" {
	context = "."
	dockerfile = "./server/Dockerfile.server"
	tags = ["gamdom-task-backend:latest"]
}