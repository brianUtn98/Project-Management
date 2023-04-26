import { BelongsToMany, Column, HasMany, Table } from "sequelize-typescript";
import Entity from "../../../utils/domain/Entity";
import User from "../../users/domain/User";
import UserProject from "./UserProject";

@Table({
    freezeTableName: true,
})
class Project extends Entity{
    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    path!: string;

    @Column
    createdAt!: Date;

    @Column
    dueDate!: Date;
    
    @BelongsToMany(() => User, () => UserProject)
    members!: User[];
}

export default Project