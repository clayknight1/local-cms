import { IMAGE_STORAGE_BUCKET, MIME_TO_EXT } from '../constants/storage';
import { supabase } from '../lib/supabase';

export async function uploadImage(file: File, folder: string): Promise<string> {
  const ext = MIME_TO_EXT[file.type];
  const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(IMAGE_STORAGE_BUCKET)
    .upload(fileName, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(IMAGE_STORAGE_BUCKET).getPublicUrl(fileName);

  return publicUrl;
}
