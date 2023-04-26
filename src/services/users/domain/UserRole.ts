import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import Entity from "../../../utils/domain/Entity";
import Role from "./Role";
import User from "./User";

@Table({
    freezeTableName: true,
})
class UserRole extends Entity{
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => Role)
    @Column
    roleId!: number;

    @BelongsTo(() => User)
    user!: User;
    
    @BelongsTo(() => Role)
    role!: Role;
}

export default UserRole