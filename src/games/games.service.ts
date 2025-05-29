import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Game } from './game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepo: Repository<Game>,
  ) {}

  async findAll(): Promise<Game[]> {
    return this.gameRepo.find();
  }

  async search(title: string): Promise<Game[]> {
    return this.gameRepo.find({
      where: { title: Like(`%${title}%`) },
    });
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gameRepo.findOneBy({ id });
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async create(gameData: Partial<Game>): Promise<Game> {
    const game = this.gameRepo.create(gameData);
    return this.gameRepo.save(game);
  }

  async update(id: number, gameData: Partial<Game>): Promise<Game> {
    await this.findOne(id);
    await this.gameRepo.update(id, gameData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.gameRepo.delete(id);
  }
}
