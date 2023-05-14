// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CoffeeSupplyChain {
    uint256 sku; // Stock Keeping Unit (SKU)

    mapping(uint256 => Item) items;
    mapping(uint256 => string[]) itemsHistory;

    enum State {
        Harvested, //0
        Processed,
        Packed,
        ForSale,
        Sold,
        Shipped,
        Received,
        Purchased
    }

    State constant defaultState = State.Harvested;

    struct Item {
        uint256 sku;
        uint256 upc;
        address ownerId; // address of the current owner as the product moves through 8 stages
        address farmerId;
        string productId;
        string productNotes;
        uint256 productPrice;
        State itemState;
        address distributorId;
        address retailerId;
        address consumerId;
    }

    event Harvested(uint256 upc);
    event Processed(uint256 upc);
    event Packed(uint256 upc);
    event ForSale(uint256 upc);
    event Sold(uint256 upc);
    event Shipped(uint256 upc);
    event Received(uint256 upc);
    event Purchased(uint256 upc);

    modifier harvested(uint256 _upc) {
        require(items[_upc].itemState == State.Harvested);
        _;
    }

    modifier processed(uint256 _upc) {
        require(items[_upc].itemState == State.Processed);
        _;
    }

    modifier packed(uint256 _upc) {
        require(items[_upc].itemState == State.Packed);
        _;
    }

    modifier forSale(uint256 _upc) {
        require(items[_upc].itemState == State.ForSale);
        _;
    }

    modifier sold(uint256 _upc) {
        require(items[_upc].itemState == State.Sold);
        _;
    }

    modifier shipped(uint256 _upc) {
        require(items[_upc].itemState == State.Shipped);
        _;
    }

    modifier received(uint256 _upc) {
        require(items[_upc].itemState == State.Received);
        _;
    }

    modifier purchased(uint256 _upc) {
        require(items[_upc].itemState == State.Purchased);
        _;
    }

    constructor() {
        sku = 1;
    }

    function harvestItem(
        uint256 _upc,
        address _farmerId,
        string memory _productNotes,
        string memory _productId
    ) public {
        items[_upc] = Item({
            sku: sku,
            upc: _upc,
            ownerId: _farmerId,
            farmerId: _farmerId,
            productId: _productId,
            productNotes: _productNotes,
            productPrice: 0,
            itemState: State.Harvested,
            distributorId: address(0),
            retailerId: address(0),
            consumerId: address(0)
        });

        sku = sku + 1;
        emit Harvested(_upc);
    }

    function processItem(
        uint256 _upc
    )
        public
        // Calling modifier to check if upc has passed previous supply chain stage
        harvested(_upc)
    {
        items[_upc].itemState = State.Processed;
        emit Processed(_upc);
    }

    function packItem(
        uint256 _upc
    )
        public
        // Call modifier to check if upc has passed previous supply chain stage
        processed(_upc)
    {
        items[_upc].itemState = State.Packed;
        emit Packed(_upc);
    }

    function sellItem(
        uint256 _upc,
        uint256 _price
    )
        public
        // Call modifier to check if upc has passed previous supply chain stage
        packed(_upc)
    {
        items[_upc].itemState = State.ForSale;
        items[_upc].productPrice = _price;
        emit ForSale(_upc);
    }

//Distributor Task
    function buyItem(
        uint256 _upc,
        address _distributorId
    )
        public
        // Call modifier to check if upc has passed previous supply chain stage
        forSale(_upc)
    {
        items[_upc].ownerId = _distributorId;
        items[_upc].distributorId = _distributorId;
        items[_upc].itemState = State.Sold;
        emit Sold(_upc);
    }

    function shipItem(
        uint256 _upc
    )
        public
        // Call modifier to check if upc has passed previous supply chain stage
        sold(_upc)
    {
        items[_upc].itemState = State.Shipped;
        emit Shipped(_upc);
    }

    function receiveItem(
        uint256 _upc,
        address _retailerId
    ) public shipped(_upc) {
        items[_upc].ownerId = _retailerId;
        items[_upc].retailerId = _retailerId;
        items[_upc].itemState = State.Received;
        emit Received(_upc);
    }

    function purchaseItem(
        uint256 _upc,
        address _consumerId
    ) public received(_upc) {
        items[_upc].ownerId = _consumerId;
        items[_upc].consumerId = _consumerId;
        items[_upc].itemState = State.Purchased;
        emit Purchased(_upc);
    }

    function fetchItemByUpc(
        uint256 _upc
    )
        public
        view
        returns (
            uint256 itemSKU,
            uint256 itemUPC,
            address farmerId,
            string memory productId,
            string memory productNotes,
            uint256 productPrice,
            uint256 itemState,
            address distributorId,
            address retailerId,
            address consumerId
        )
    {
        itemSKU = items[_upc].sku;
        itemUPC = items[_upc].upc;
        farmerId = items[_upc].farmerId;
        productId = items[_upc].productId;
        productNotes = items[_upc].productNotes;
        productPrice = items[_upc].productPrice;
        //convert to numeric value
        itemState = uint256(items[_upc].itemState);
        distributorId = items[_upc].distributorId;
        retailerId = items[_upc].retailerId;
        consumerId = items[_upc].consumerId;

        return (
            itemSKU,
            itemUPC,
            farmerId,
            productId,
            productNotes,
            productPrice,
            itemState,
            distributorId,
            retailerId,
            consumerId
        );
    }
}