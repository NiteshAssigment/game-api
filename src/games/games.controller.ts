import { Controller, Get, Post, Param, Body, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './game.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)  // <-- Protect all routes in this controller
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getAll(@Query('title') title?: string): Promise<Game[]> {
    if (title) return this.gamesService.search(title);
    return this.gamesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Game> {
    return this.gamesService.findOne(+id);
  }

  @Post()
  create(@Body() gameData: Partial<Game>): Promise<Game> {
    return this.gamesService.create(gameData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() gameData: Partial<Game>): Promise<Game> {
    return this.gamesService.update(+id, gameData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.gamesService.delete(+id);
  }
}
