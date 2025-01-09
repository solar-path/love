import { Injectable } from '@nestjs/common';
import { db } from 'src/database/database';
import { buildTree } from 'src/helpers/buildTree.helper';
import { generateResponse } from 'src/helpers/generateResponse.helper';
import { eq } from 'drizzle-orm';
import { postTable } from '@/database/schema/docs.drizzle';

@Injectable()
export class DocsService {
  async postList() {
    const data =
      (await db
        .select({
          id: postTable.id,
          title: postTable.title,
          parent: postTable.parent,
        })
        .from(postTable)) || [];

    const tree = buildTree(data, 'parent');

    return tree
      ? generateResponse({
          data: tree,
          success: true,
          message: 'Posts fetched successfully',
        })
      : generateResponse({
          data: null,
          success: false,
          message: 'Failed to fetch posts',
        });
  }

  async postDetail(id: string) {
    if (!id) {
      return generateResponse({
        data: null,
        success: false,
        message: 'Invalid ID',
      });
    }

    const record =
      (await db.query.postTable
        .findFirst({
          where: eq(postTable.id, id),
          with: {
            author: {
              columns: {
                email: true,
                avatar: true,
                fullname: true,
              },
            },
          },
        })
        .then((res) => res[0])) || null;

    return record
      ? generateResponse({
          data: record,
          success: true,
          message: 'Post fetched successfully',
        })
      : generateResponse({
          data: null,
          success: false,
          message: 'Post not found',
        });
  }
}
