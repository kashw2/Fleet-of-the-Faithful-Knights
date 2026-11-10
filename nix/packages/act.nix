{ ... }:
{
  flake.wrappers.act =
    { pkgs, wlib, ... }:
    {
      imports = [ wlib.modules.default ];
      config = {
        package = pkgs.act;
        # Every workflow in .github/workflows runs on ubuntu-latest
        flags."-P" = "ubuntu-latest=catthehacker/ubuntu:full-latest";
      };
    };
}
