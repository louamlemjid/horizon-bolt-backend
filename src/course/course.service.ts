import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
@Injectable()
export class CourseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_API_KEY
    );
  }
  async joinCourse(userId: string, courseName: string) {
    // Ensure the course name is valid
    if (!courseName) {
      throw new Error('Course name cannot be empty');
    }

    // Update the user's `joined_course` field
    const { data, error } = await this.supabase
      .from('users')
      .update({ joined_course: courseName })
      .eq('id', userId);

    if (error) {
      throw new Error(`Failed to join course: ${error.message}`);
    }

    return { message: `Successfully joined the course: ${courseName}`, data };
  }
  async createCourse(name: string, description: string, price: number) {
    const { data, error } = await this.supabase
      .from('courses')
      .insert([
        {
          name,
          description,
          price,
        },
      ])
      .single(); // To return only one row

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Find all courses
  async findAllCourses() {
    const { data, error } = await this.supabase
      .from('courses')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Find a course by id
  async findCourseById(courseId: string) {
    const { data, error } = await this.supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single(); // To return a single course

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Update course details (including price)
  async updateCourse(courseId: string, name: string, description: string, price: number) {
    const { data, error } = await this.supabase
      .from('courses')
      .update({ name, description, price, updated_at: new Date() })
      .eq('id', courseId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Delete a course
  async deleteCourse(courseId: string) {
    const { data, error } = await this.supabase
      .from('courses')
      .delete()
      .eq('id', courseId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
  
}
