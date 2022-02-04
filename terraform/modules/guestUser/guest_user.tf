resource "azuread_invitation" "spindizzy" {
  redirect_url       = "https://portal.azure.com"
  user_email_address = "spindizzyppc@gmail.com"
  user_display_name  = "Spindizzy"
  user_type          = "Guest"

  message {
    language = "en-US"
  }

}

resource "azuread_invitation" "grandmaster_flash" {
  redirect_url       = "https://portal.azure.com"
  user_email_address = "grandmaster.flash15@gmail.com"
  user_display_name  = "Grandmaster Flash"
  user_type          = "Guest"

  message {
    language = "en-US"
  }

}

resource "azuread_invitation" "bship" {
  redirect_url       = "https://portal.azure.com"
  user_email_address = "Fleetofthefaithfulknights@gmail.com"
  user_display_name  = "Bship"
  user_type          = "Guest"

  message {
    language = "en-US"
  }

}