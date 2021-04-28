resource "google_cloud_run_service" "api" {
  location = var.region
  name = "api"

  template {
    spec {
      containers {
        image = "gcr.io/the-sandbox-311907/api:latest"
        ports {
          container_port = 3000
        }
        env {
          name = "FFK_DATABASE_SERVER"
          value = var.FFK_DATABASE_SERVER
        }
        env {
          name = "FFK_DATABASE_PORT"
          value = var.FFK_DATABASE_PORT
        }
        env {
          name = "FFK_DATABASE_NAME"
          value = var.FFK_DATABASE_NAME
        }
        env {
          name = "FFK_DATABASE_USERNAME"
          value = var.FFK_DATABASE_USERNAME
        }
        env {
          name = "FFK_DATABASE_PASSWORD"
          value = var.FFK_DATABASE_PASSWORD
        }
      }
    }
  }

  traffic {
    percent = 100
    latest_revision = true
  }

}

resource "google_cloud_run_service" "panel" {
  location = var.region
  name = "panel"

  template {
    spec {
      containers {
        image = "gcr.io/the-sandbox-311907/panel:latest"
        ports {
          container_port = 80
        }
      }
    }
  }

  traffic {
    percent = 100
    latest_revision = true
  }

}
