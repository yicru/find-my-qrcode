export type Json =
  | { [key: string]: Json | undefined }
  | Json[]
  | boolean
  | null
  | number
  | string

export interface Database {
  graphql_public: {
    CompositeTypes: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
  }
  public: {
    CompositeTypes: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Tables: {
      qrcodes: {
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Relationships: []
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
  }
  storage: {
    CompositeTypes: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          metadata: Json
          name: string
          owner: string
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          bucket_id: string
          size: number
        }[]
      }
      search: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
    }
    Tables: {
      buckets: {
        Insert: {
          allowed_mime_types?: null | string[]
          avif_autodetection?: boolean | null
          created_at?: null | string
          file_size_limit?: null | number
          id: string
          name: string
          owner?: null | string
          public?: boolean | null
          updated_at?: null | string
        }
        Relationships: [
          {
            columns: ['owner']
            foreignKeyName: 'buckets_owner_fkey'
            referencedColumns: ['id']
            referencedRelation: 'users'
          },
        ]
        Row: {
          allowed_mime_types: null | string[]
          avif_autodetection: boolean | null
          created_at: null | string
          file_size_limit: null | number
          id: string
          name: string
          owner: null | string
          public: boolean | null
          updated_at: null | string
        }
        Update: {
          allowed_mime_types?: null | string[]
          avif_autodetection?: boolean | null
          created_at?: null | string
          file_size_limit?: null | number
          id?: string
          name?: string
          owner?: null | string
          public?: boolean | null
          updated_at?: null | string
        }
      }
      migrations: {
        Insert: {
          executed_at?: null | string
          hash: string
          id: number
          name: string
        }
        Relationships: []
        Row: {
          executed_at: null | string
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: null | string
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Insert: {
          bucket_id?: null | string
          created_at?: null | string
          id?: string
          last_accessed_at?: null | string
          metadata?: Json | null
          name?: null | string
          owner?: null | string
          path_tokens?: null | string[]
          updated_at?: null | string
          version?: null | string
        }
        Relationships: [
          {
            columns: ['bucket_id']
            foreignKeyName: 'objects_bucketId_fkey'
            referencedColumns: ['id']
            referencedRelation: 'buckets'
          },
        ]
        Row: {
          bucket_id: null | string
          created_at: null | string
          id: string
          last_accessed_at: null | string
          metadata: Json | null
          name: null | string
          owner: null | string
          path_tokens: null | string[]
          updated_at: null | string
          version: null | string
        }
        Update: {
          bucket_id?: null | string
          created_at?: null | string
          id?: string
          last_accessed_at?: null | string
          metadata?: Json | null
          name?: null | string
          owner?: null | string
          path_tokens?: null | string[]
          updated_at?: null | string
          version?: null | string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
  }
}
