resource "azuread_invitation" "spindizzy" {
  redirect_url       = "https://portal.azure.com"
  user_email_address = "spindizzyppc@gmail.com"

  lifecycle {
    prevent_destroy = true
  }
}