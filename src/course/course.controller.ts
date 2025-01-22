import { Controller,  Patch, Param,UseGuards, Put,Body,Post,Get,Request,Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '../auth/auth.guard';
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  
  @UseGuards(AuthGuard)
  @Patch(':courseName')
  joinCourse(@Request() req: any, @Param('courseName') courseName: string) {
    return this.courseService.joinCourse(req.user.id, courseName);
  }
  @Post()
  async create(@Body() body: { name: string; description: string; price: number }) {
    return this.courseService.createCourse(body.name, body.description, body.price);
  }

  // Get all courses
  @Get()
  async findAll() {
    return this.courseService.findAllCourses();
  }

  // Get a single course by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.courseService.findCourseById(id);
  }

  // Update a course with price
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; description: string; price: number },
  ) {
    return this.courseService.updateCourse(id, body.name, body.description, body.price);
  }

  // Delete a course
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }
}
