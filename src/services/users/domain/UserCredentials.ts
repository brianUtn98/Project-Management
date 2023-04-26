import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import Entity from "../../../utils/domain/Entity";
import User from "./User";

@Table({
    freezeTableName: true,
})
class UserCredentials extends Entity{
    @Column
    email!: string;

    @Column
    password!: string; // Hashed password

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}

export default UserCredentials