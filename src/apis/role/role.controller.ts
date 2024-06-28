import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RequestType } from 'src/shared/utils/request-type';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post(RequestType.create)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get(RequestType.getAll)
  findAll() {
    return this.roleService.findAll();
  }

  @Get(RequestType.getById+':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(RequestType.update+':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(RequestType.delete+':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
