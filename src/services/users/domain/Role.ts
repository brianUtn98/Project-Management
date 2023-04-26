import {  BelongsToMany, Column, Table } from "sequelize-typescript";
import Entity from "../../../utils/domain/Entity";
import User from "./User";
import UserRole from "./UserRole";

@Table({
    freezeTableName: true,
})
class Role extends Entity{
    @Column
    name!: string;

    @Column
    description!: string
    
    @BelongsToMany(() => User, ( ) => UserRole)
    users!: User[]
}

export default Role