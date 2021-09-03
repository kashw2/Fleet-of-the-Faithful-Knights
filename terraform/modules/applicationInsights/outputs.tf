output "panel_key" {
  value = azurerm_application_insights.panel.instrumentation_key
}

output "api_key" {
  value = azurerm_application_insights.api.instrumentation_key
}

output "onboarding_key" {
  value = azurerm_application_insights.onboarding.instrumentation_key
}