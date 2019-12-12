# This is a bash function that was used as part of v2 of the demo to fake cnab commands in the terminal.

## CAPSTONE ALIASES
cnab() {
  if [ $# -lt 2 ]
  then
    echo "Pass an action and a bundle name with 'cnab'"
    kill -INT $$
  fi
  if [ $# -gt 2 ]
  then
    echo "Bundle name cannot contain spaces"
    kill -INT $$
  fi

  case "$1" in

  'install')  echo "Running Install"
      porter install $2 --tag deislabs/porter-hello-bundle:latest >/dev/null
      echo "..."
      sleep 2 && echo "Done."
      ;;
  'upgrade')  echo  "Running Upgrade"
      porter upgrade $2 >/dev/null
      echo "..."
      sleep 2 && echo "Done."
      ;;
  'uninstall')  echo  "Running Uninstall"
      porter uninstall $2 >/dev/null
      echo "..."
      sleep 2 && echo "Done."
      ;;
  *) echo "Action is not supported: $1"
    ;;
  esac

}