resource "google_cloud_run_domain_mapping" "api" {
  location = "us-central1"
  name     = "api.faithfulknights.com"

  metadata {
    namespace = var.project_name
  }

  spec {
    route_name = var.api_name
  }
}

resource "google_cloud_run_domain_mapping" "panel" {
  location = "us-central1"
  name     = "panel.faithfulknights.com"

  metadata {
    namespace = var.project_name
  }

  spec {
    route_name = var.panel_name
  }
}