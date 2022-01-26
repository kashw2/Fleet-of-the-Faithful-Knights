output "server" {
  value = azurerm_container_registry.registry.login_server
}

output "username" {
  value = azurerm_container_registry.registry.admin_username
}

output "password" {
  value = azurerm_container_registry.registry.admin_password
}

output "name" {
  value = azurerm_container_registry.registry.name
}