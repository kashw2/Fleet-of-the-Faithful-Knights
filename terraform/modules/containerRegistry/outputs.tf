output "login_server" {
  value = azurerm_container_registry.registry.login_server
}

output "username" {
  value = azurerm_container_registry.registry.admin_username
}

output "password" {
  value = azurerm_container_registry.registry.admin_password
}