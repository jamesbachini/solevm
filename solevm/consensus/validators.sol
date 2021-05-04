pragma solidity ^0.8.1;

contract ManageValidators {
    address[] public validators;
    
    function addValidator(address _addy) public {
        validators.push(_addy);
    }
    
    function validatorCount() public view returns (uint) {
        return validators.length;
    }
    
    function getValidators()public view returns( address  [] memory){
        return validators;
    }
}
