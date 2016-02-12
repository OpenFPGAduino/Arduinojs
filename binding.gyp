{
  'targets': [
    {
      'target_name': 'openfpgaduino',
      'include_dirs' : [ '<(module_root_dir)/../libAduino/api'],
      'libraries': [ '<(module_root_dir)/../libAduino/libaduino.a'],
      'sources': [ "openfpgaduino.cc" ]
    }
  ]
}
