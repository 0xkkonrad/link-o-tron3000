#!/usr/bin/python3

#############################################################################################
# Deploy contract to network
# 
# Usage: (venv)$ brownie run scripts/deploy.py
#   Optional: --networks ...
#
#############################################################################################

from brownie import TwoPhasedEscrow, accounts, network, config
from scripts.helpful_scripts import get_publish_source


def main():
    dev = accounts.add(config["wallets"]["from_key"])
    print(network.show_active())

    contract = TwoPhasedEscrow.deploy(
        {"from": dev},
        publish_source=get_publish_source(),
    )
    
    print()
    events = contract.tx.events # dictionary
    for event in events:
        print(event['message'])

    return contract
