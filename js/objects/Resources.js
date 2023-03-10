export default class Resource extends Phaser.Physics.Matter.Sprite {
    static preload(scene) {
        scene.load.atlas(
            "resources",
            "assets/images/furniture.png",
            "assets/images/furniture_atlas.json"
        );
    }

    constructor(data) {
        let { scene, resource } = data;
        super(
            scene.matter.world,
            resource.x,
            resource.y,
            "resources",
            resource.properties.find((p) => p.name == "type").value
        );
        this.scene.add.existing(this);
        // let yOrigin = resource.properties.find(
        //     (p) => p.name == "yOrigin"
        // ).value; // #1 오브젝트 collider를 원형으로 적용할 시 사용
        this.name = resource.properties.find((p) => p.name == "type").value;
        this.x += this.width / 2;
        this.y -= this.height / 2;
        // this.y = this.y + this.height * (yOrigin - 0.5); // #1 오브젝트 collider를 원형으로 적용할 시 사용
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let circleCollider = Bodies.circle(this.x, this.y, 12, {
            isSensor: false,
            label: "collider",
        });
        // this.setExistingBody(circleCollider); // #1 오브젝트 collider를 원형으로 적용할 시 사용
        this.setStatic(true);
        // this.setOrigin(0.5, yOrigin); // #1 오브젝트 collider를 원형으로 적용할 시 사용
    }
}
