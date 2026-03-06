import { Dropzone, type FileWithPath } from '@mantine/dropzone';
import { Box, Text, Image, Stack, Group, ActionIcon } from '@mantine/core';
import { IconUpload, IconX, IconPhoto, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

type ImageUploadProps = {
  label?: string;
  existingImageUrl?: string | null;
  onFileSelect: (file: File | null) => void;
};

export default function ImageUpload({
  label = 'Hero Image',
  existingImageUrl,
  onFileSelect,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    existingImageUrl ?? null,
  );
  const [error, setError] = useState<string | null>(null);

  function validateAndSelect(files: FileWithPath[]): void {
    const file = files[0];
    if (!file) return;

    // Size check - 2MB
    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be under 2MB.');
      return;
    }

    setError(null);
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  }

  function handleRemove(): void {
    setPreview(null);
    onFileSelect(null);
    setError(null);
  }

  return (
    <Stack gap='xs'>
      <Text size='sm' fw={500}>
        {label}
      </Text>

      {preview ? (
        <Box
          style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}
        >
          <Image
            src={preview}
            alt='Preview'
            radius='md'
            style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
          />
          <ActionIcon
            onClick={handleRemove}
            style={{ position: 'absolute', top: 8, right: 8 }}
            color='red'
            variant='filled'
            size='sm'
          >
            <IconTrash size={14} />
          </ActionIcon>
        </Box>
      ) : (
        <Dropzone
          onDrop={validateAndSelect}
          onReject={() =>
            setError('Invalid file. Please use a JPG or PNG under 2MB.')
          }
          maxSize={2 * 1024 * 1024}
          accept={['image/png', 'image/jpeg']}
          multiple={false}
        >
          <Group
            justify='center'
            gap='xl'
            mih={120}
            style={{ pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload
                size={40}
                color='var(--mantine-color-blue-6)'
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={40}
                color='var(--mantine-color-red-6)'
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                size={40}
                color='var(--mantine-color-dimmed)'
                stroke={1.5}
              />
            </Dropzone.Idle>
            <Stack gap={4} align='center'>
              <Text size='sm' fw={500}>
                Drop image here or click to select
              </Text>
              <Text size='xs' c='dimmed'>
                PNG or JPG, 16:9 landscape, max 2MB
              </Text>
            </Stack>
          </Group>
        </Dropzone>
      )}

      {error && (
        <Text size='xs' c='red'>
          {error}
        </Text>
      )}
    </Stack>
  );
}
