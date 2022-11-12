import pytest
from brownie import (
    accounts,
    config,
    network,
    TwoPhasedEscrow,
)

# reset the chain at the beginning of tests
@pytest.fixture(autouse=True)
def isolation(fn_isolation):
    pass

